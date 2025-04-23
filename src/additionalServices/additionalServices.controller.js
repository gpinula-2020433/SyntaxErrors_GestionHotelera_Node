import AdditionalService from './additionalService.model.js'

export const getAllServices = async (req, res) => {
    const { limit = 10, skip = 0 } = req.query;
    try {
        const services = await AdditionalService.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('hotel', 'name -_id');

        if (services.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No additional services found'
            });
        }

        return res.send({
            success: true,
            message: 'Additional services found',
            total: services.length,
            services
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const getServiceByID = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await AdditionalService.findById(id)
            .populate('hotel', 'name -_id');

        if (!service) {
            return res.status(404).send({
                success: false,
                message: 'Additional service not found'
            });
        }

        return res.send({
            success: true,
            message: 'Additional service found',
            service
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const createService = async (req, res) => {
    try {
        const data = req.body;
        const service = new AdditionalService(data);
        await service.save();

        return res.send({
            success: true,
            message: 'Additional service created successfully',
            service
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updated = await AdditionalService.findByIdAndUpdate(id, data, { new: true });

        if (!updated) {
            return res.status(404).send({
                success: false,
                message: 'Additional service not found'
            });
        }

        return res.send({
            success: true,
            message: 'Additional service updated successfully',
            updated
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await AdditionalService.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Additional service not found'
            });
        }

        return res.send({
            success: true,
            message: 'Additional service deleted successfully'
        });
    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};