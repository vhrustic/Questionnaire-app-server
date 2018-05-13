import {Page, Question} from './../../models/';
import {failure, notFound} from '../../services/response';

export const createPage = (req, res) => {
  const {questionnaireId} = req.params;
  Page.create({questionnaireId}).then((createdModel) => {
    Page.count({where: {questionnaireId}}).then(count => {
      return res.status(200).json({...createdModel.dataValues, pageNumber: count});
    });
  }).catch(failure(res, 400));
};

export const getPage = (req, res) => {
  const {questionnaireId, pageId} = req.params;
  Page.findAll({
    where: {questionnaireId},
    include: [{
      model: Question,
      as: 'questions',
    }],
    order: [['createdAt', 'ASC']],
  }).then(notFound(res)).then((pages) => {
    if (!pages) {
      return null;
    }
    const pageNumber = pages.findIndex(p => p.id === parseInt(pageId, 10));
    const page = {
      ...pages[pageNumber].dataValues,
      pageNumber: pageNumber + 1,
    };
    return res.status(200).json(page);
  }).catch(failure(res, 400));
};

export const deletePage = (req, res) => {
  const {pageId} = req.params;
  Page.destroy({where: {id: pageId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).json({id: pageId});
  }).catch(failure(res, 400));
};
