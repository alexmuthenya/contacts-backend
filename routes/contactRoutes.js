import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { 
    createContact, 
    deleteContact, 
    getContact, 
    getContacts, 
    updateContact 
} from '../controllers/contactController.js'
import { validateToken } from '../middleware/validateTokenHandler.js'
export const router = express.Router()

router.use(validateToken)

router.get('/',expressAsyncHandler(getContacts))
router.get('/:id', expressAsyncHandler(getContact))
router.post('/', expressAsyncHandler(createContact))
router.put('/:id', expressAsyncHandler(updateContact))
router.delete('/:id', expressAsyncHandler(deleteContact))