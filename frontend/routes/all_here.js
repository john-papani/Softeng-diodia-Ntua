const { default: axios } = require('axios')
const express = require('express')
const stationRouter = express.Router()




stationRouter.get('/home', async(req, res) => {
    res.render('home')

})
stationRouter.get('/', async(req, res) => {
    res.redirect('home')
})


stationRouter.get('/help', async(req, res) => {
    res.render('help')
        // res.redirect('home')
})


stationRouter.get('/chargesby/:id/:datefrom/:dateto', async(req, res) => {
    let stationID = req.params.id
    let dfrom = req.params.datefrom
    let dto = req.params.dateto

    try {
        const resAPI = await axios.get(`http://localhost:8000/ChargesBy/${stationID}/${dfrom}/${dto}`)
        res.render('chargesby', { chargesBy: resAPI.data, chargesByid: stationID })
    } catch (err) {
        if (err.response) {
            res.render('chargesby', { chargesBy: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('chargesby', { chargesBy: null })
            console.log(err.requiest)
        } else {
            res.render('chargesby', { chargesBy: null })
            console.error('Error', err.message)
        }

    }
})
stationRouter.get('/cost/:id1/:id2/:datefrom/:dateto', async(req, res) => {
    let stationID1 = req.params.id1
    let stationID2 = req.params.id2
    let dfrom = req.params.datefrom
    let dto = req.params.dateto

    try {
        const resAPI = await axios.get(`http://localhost:8000/PassesCost/${stationID1}/${stationID2}/${dfrom}/${dto}`)
        res.render('passcost', { passesCost: resAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('passcost', { passesCost: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('passcost', { passesCost: null })
            console.log(err.requiest)
        } else {
            res.render('passcost', { passesCost: null })
            console.error('Error', err.message)
        }

    }
})
stationRouter.get('/pass/:id/:datefrom/:dateto', async(req, res) => {
    let stationID = req.params.id
    let dfrom = req.params.datefrom
    let dto = req.params.dateto

    try {
        const resAPI = await axios.get(`http://localhost:8000/PassesPerStation/${stationID}/${dfrom}/${dto}`)
        res.render('passesper', { passesPer: resAPI.data.list, passPernum: resAPI.data.num, passesPerid: stationID })
    } catch (err) {
        if (err.response) {
            res.render('passesper', { passesPer: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('passesper', { passesPer: null })
            console.log(err.requiest)
        } else {
            res.render('passesper', { passesPer: null })
            console.error('Error', err.message)
        }

    }
})


stationRouter.get('/analysis/:id1/:id2/:datefrom/:dateto', async(req, res) => {
    let stationID1 = req.params.id1
    let stationID2 = req.params.id2
    let dfrom = req.params.datefrom
    let dto = req.params.dateto

    try {
        const resAPI = await axios.get(`http://localhost:8000/PassesAnalysis/${stationID1}/${stationID2}/${dfrom}/${dto}`)
        res.render('passesanal', { passesAnal: resAPI.data.list, passAnalnum: resAPI.data.num, passesAnalid1: stationID1, passesAnalid2: stationID2 })
    } catch (err) {
        if (err.response) {
            res.render('passesanal', { passesAnal: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('passesanal', { passesAnal: null })
            console.log(err.requiest)
        } else {
            res.render('passesanal', { passesAnal: null })
            console.error('Error', err.message)
        }

    }
})




module.exports = stationRouter