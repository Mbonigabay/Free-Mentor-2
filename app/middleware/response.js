const response = { 
     responseSpec (res, status, message, data, error){
        if (error){
            return res.json({
                status,
                error,
            });
        } else {
            return res.json({
                status,
                message,
                data,
            });
        }
    }
}

module.exports = response;