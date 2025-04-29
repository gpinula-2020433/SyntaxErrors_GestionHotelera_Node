import Service from './service.model'

export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const services = await Service.find()
            .skip(skip)
            .limit(limit)

        if(services.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Services not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Services found: ',
                total: services.length + ' services',
                services
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const getByID = async(req, res)=>{
    try {
        let {id} = req.params
        const service = await Service.findById(id)

        if(!service)
            return res.status(404).send(
                {
                    success: false,
                    message: "Service not found"
                }
            )
        return res.send(
            {
                success: true,
                message: 'Service found',
                service
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const save = async(req, res)=>{
    const data = req.body
    try {
        data.user = req.user.uid
        const service = new Service(data)
        await service.save()

        return res.send(
            {
                success: true,
                message: 'Saved successfully',
                service
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const updateService = async(req, res)=>{
    try {
        const {id} = req.params
        const data = req.body

        const update = await Service.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update)
            return res.status(404).send(
                {
                    success: false,
                    message: 'Service not found'
                }
            )
        return res.send(
            {
                success: true,
                message: 'Service updated',
                update
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const deleteService = async(req, res)=>{
    try {
        let {id} = req.params
        let service = await Service.findByIdAndDelete(id)
        
        if(!service)
            return res.status(404).send(
                {
                    success: false,
                    message: 'Service not founded'
                }
            )
        return res.send(
            {
                success: true,
                message: 'Deleted successfully'
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}