import {Questionnaire, Page} from './../../models/';
import {failure, notFound} from '../../services/response';

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

export const getQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  Questionnaire.findById(questionnaireId).then(notFound(res)).then((questionnaire) => {
    if (!questionnaire) {
      return null;
    }
    return res.status(200).json(questionnaire);
  }).catch(failure(res, 400));
};

export const updateQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  const {title} = req.body;
  Questionnaire.update({title}, {where: {id: questionnaireId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).send();
  }).catch(failure(res, 400));
};

export const deleteQuestionnaire = (req, res) => {
  const {questionnaireId} = req.params;
  Questionnaire.destroy({where: {id: questionnaireId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).send();
  }).catch(failure(res, 400));
};