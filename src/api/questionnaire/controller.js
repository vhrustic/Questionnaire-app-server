import {Questionnaire, Page, Question, Option, Answer, sequelize, Sequelize} from './../../models/';
import {failure, notFound} from '../../services/response';

export const getQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  Questionnaire.findOne({
    where: {id: questionnaireId},
    include: [{model: Page, as: 'pages'}],
    order: [[{model: Page, as: 'pages'}, 'createdAt', 'asc']],
  }).then(notFound(res)).then((questionnaire) => {
    if (!questionnaire) {
      return null;
    }
    return res.status(200).json(questionnaire);
  }).catch(failure(res, 400));
};

export const getUserQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  Questionnaire.findOne({
    where: {id: questionnaireId},
    include: [{
      model: Page,
      as: 'pages',
      attributes: {exclude: ['createdAt', 'updatedAt', 'questionnaireId']},
      include: [{
        model: Question,
        as: 'questions',
        attributes: {exclude: ['createdAt', 'updatedAt', 'pageId']},
        include: [{
          model: Option, as: 'options', attributes: {exclude: ['createdAt', 'updatedAt', 'questionId']},
        }]
      }]
    }],
  }).then(notFound(res)).then((questionnaire) => {
    if (!questionnaire) {
      return null;
    }
    return res.status(200).json(questionnaire);
  }).catch(failure(res, 400));
};

export const getAllQuestionnaires = (req, res) => {
  Questionnaire.findAll({where: {createdBy: req.user.id}}).then(notFound(res)).then((questionnaires) => {
    if (!questionnaires) {
      return null;
    }
    return res.status(200).json(questionnaires);
  }).catch(failure(res, 400));
};

export const getUncompletedQuestionnaires = (req, res) => {
  const userId = req.user.id;
  sequelize.query(`SELECT * 
FROM questionnaires
WHERE id NOT IN(SELECT questionnaireId FROM (SELECT p.questionnaireId, a.userId
FROM questionnaires qn, pages p, questions q, options o, answers a
WHERE qn.id = p.questionnaireId AND p.id = q.pageId AND q.id = o.questionId AND o.id = a.optionId AND a.userId = :userId
GROUP BY userId, questionnaireId
ORDER BY qn.createdAt ASC) as temp);`, {
    replacements: {userId},
    type: sequelize.QueryTypes.SELECT,
  }).then(resp => {
    res.json(resp);
  });
};


export const createQuestionnaire = (req, res) => {
  const {title} = req.body;
  const user = req.user;
  Questionnaire.create({title, createdBy: user.id}).then((createdModel) => {
    Page.create({questionnaireId: createdModel.id}).then((createdPage) => {
      const resp = {...createdModel.dataValues, pages: [createdPage.dataValues]};
      return res.status(200).json(resp);
    }).catch(failure(res, 400));
  }).catch(failure(res, 400));
};


export const updateQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  const {title} = req.body;
  Questionnaire.update({title}, {where: {id: questionnaireId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).json({id: questionnaireId});
  }).catch(failure(res, 400));
};

export const deleteQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  Questionnaire.destroy({where: {id: questionnaireId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).json({id: questionnaireId});
  }).catch(failure(res, 400));
};
