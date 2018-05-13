import {Question, Option} from './../../models/';
import {failure, notFound} from '../../services/response';
import {Questionnaire} from "../../models";

export const createQuestion = (req, res) => {
  const {pageId} = req.params;
  const question = req.body;
  Question.create({
    ...question,
    pageId
  }, {include: [{model: Option, as: 'options'}]}).then((createdModel) => {
    return res.status(200).json(createdModel);
  }).catch(failure(res, 400));
};

export const updateQuestion = (req, res) => {
  const {questionId} = req.params;
  const question = req.body;
  const promises = [];
  let promise = Option.destroy({where: {questionId}});
  question.options.forEach((option) => {
    promise = Option.create({text: option.text, questionId});
    promises.push(promise);
  });
  Question.update({
    title: question.title,
    type: question.type
  }, {where: {id: questionId}}).then(notFound(res)).then((updatedQuestion) => {
    if (!updatedQuestion) {
      return null;
    }
    Promise.all(promises).then((newOptions) => {
      question.options = newOptions;
      res.status(200).send(question);
    }).catch(err => {
      return res.status(400).json(err);
    });
  });

};

export const getQuestion = (req, res) => {
  const {questionId} = req.params;
  Question.findOne({
    where: {id: questionId},
    include: [{
      model: Option,
      as: 'options',
    }]
  }).then(notFound(res)).then((question) => {
    if (!question) {
      return null;
    }
    return res.status(200).json(question);
  }).catch(failure(res, 400));
};

export const deleteQuestion = (req, res) => {
  const {questionId} = req.params;
  Question.destroy({where: {id: questionId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).json({id: questionId});
  }).catch(failure(res, 400));
};
