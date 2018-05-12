import {Questionnaire} from './../../models/';
import {failure} from "../../services/response";

export const createQuestionnaire = (req, res) => {
  const {title} = req.body;
  const user = req.user;
  Questionnaire.create({title, createdBy: user.id}).then((createdModel) => {
    res.status(200).json(createdModel);
  }).catch(failure(res, 400));
};
