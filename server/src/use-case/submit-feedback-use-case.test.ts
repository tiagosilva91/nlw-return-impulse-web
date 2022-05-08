import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//spies = espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit Feedback', ()=>{
    it('should be able to submit feedback', async ()=>{
        await expect(submitFeedback.execute({
          type: 'BUG',
          comment: 'example comment',
          screenshot: 'data:image/png;base64,1321321321321321321qjwohewajhesjfhsufheoudhdjdslkdjsçlkdsj'  
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async ()=>{
        await expect(submitFeedback.execute({
          type: '',
          comment: 'example comment',
          screenshot: 'data:image/png;base64,1321321321321321321qjwohewajhesjfhsufheoudhdjdslkdjsçlkdsj'  
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async ()=>{
        await expect(submitFeedback.execute({
          type: 'BUG',
          comment: '',
          screenshot: 'data:image/png;base64,1321321321321321321qjwohewajhesjfhsufheoudhdjdslkdjsçlkdsj'  
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without a invalid screenshot', async ()=>{
        await expect(submitFeedback.execute({
          type: 'BUG',
          comment: 'example comment',
          screenshot: 'teste.png'  
        })).rejects.toThrow();
    });
})