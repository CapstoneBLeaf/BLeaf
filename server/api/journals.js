const express = require('express');
const router = express.Router();
const { authRequired } = require('./util');
const { getAllJournals, getJournalsById, createJournals, updateJournals, deleteJournals} = require('../db/sqlHelperFunctions/journals');

router.get('/', async (req, res, next) => {
    try {
        const journals = await getAllJournals();
        res.send(journals);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const journal = await getJournalsById(req.params.id);
        res.send(journal);
    } catch (error) {
        next(error);
    }
});


router.post('/', authRequired, async (req, res, next) => {
    try {
        const journal = await createJournals(req.body);
        res.send(journal);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', authRequired, async (req, res, next) => {
    try {
        const journals = await updateJournals(req.params.id, req.body);
        res.send(journals);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authRequired, async (req, res, next) => {
    try {
        const journal = await deleteJournals(req.params.id);
        res.send(journal);
    } catch (err) {
        next(err);
    }
});

module.exports = router;