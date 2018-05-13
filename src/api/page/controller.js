import {Page} from './../../models/';
import {failure, notFound} from '../../services/response';

export const createPage = (req, res) => {
  const {questionnaireId} = req.params;
  Page.create({questionnaireId}).then((createdModel) => {
    return res.status(200).json(createdModel);
  }).catch(failure(res, 400));
};

export const getPage = (req, res) => {
  const {pageId} = req.params;
  Page.findById(pageId).then(notFound(res)).then((page) => {
    if (!page) {
      return null;
    }
    return res.status(200).json(page);
  }).catch(failure(res, 400));
};

export const deletePage = (req, res) => {
  const {pageId} = req.params;
  Page.destroy({where: {id: pageId}}).then(notFound(res)).then((count) => {
    if (!count) {
      return null;
    }
    return res.status(200).send();
  }).catch(failure(res, 400));
};
