import { Answer } from './../../models/';
import { failure } from '../../services/response';

export const createAnswers = (req, res) => {
  const user = req.user;
  const answers = req.body;
  answers.forEach((answer) => {
    answer.userId = user.id;
  });
  Answer.bulkCreate(answers).then((response) => {
    return res.status(200).json(response);
  }).catch(failure(res, 400));
};
