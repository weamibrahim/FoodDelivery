// routes/webhook.js
const express = require('express');
const router = express.Router();
const WebhookController = require('../Controller/WebHookController'); 

router.post('/', WebhookController.handleWebhook);

module.exports = router;
