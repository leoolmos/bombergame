import express from 'express';
import users from './controllers/users';

const router = express.Router()

router.get('/me/exist', users.exist );
router.get('/me/friends', users.getFriends );
router.get('/me/mercs', users.getMercs );
router.post('/me/mercs', users.addMercs );
router.delete('/me/mercs/:facebook_id', users.deleteMercs );
router.post('/me/youtube', users.subscribeYoutube );
router.get('/me', users.get );
router.post('/me', users.create );

export default router