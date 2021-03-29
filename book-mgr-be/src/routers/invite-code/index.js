const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
// const jwt = require('jsonwebtoken');

const InviteCode = mongoose.model('InviteCode');

const router = new Router({
    prefix: '/invite',
});


module.exports = router;