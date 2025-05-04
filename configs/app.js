
'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import serviceRoutes from '../src/service/service.routes.js'
//import roomRoutes from '../src/room/room.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import { defaultAdmin } from '../src/auth/auth.controller.js'

//import { addDefaultAdmin } from '../src/user/user.controller.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)

}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/hotel', hotelRoutes)
    app.use('/v1/service', serviceRoutes)
    app.use('/user', userRoutes)
}

export const initServer =()=>{
    const app= express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        
        console.log(`Server running in port: ${process.env.PORT}`)
        defaultAdmin('Pinula', 'Pamal', 'Ppamal', 'Ppamal@gmail.com', 'StrongPas.sword123', '12345678', 'ADMIN')
        //addDefaultAdmin()
    }catch(err){
        console.error('Server init failed', err)
    }
}
