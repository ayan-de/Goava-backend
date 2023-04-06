const cookieToken = (user, res, message) => {
    const token = user.getJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 *60 *1000
        ),
        httpOnly: true, //accessible only by web server
        // secure: true, //https
        // sameSite:'None' //cross-site cookie
    }

    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user,
        message
    });
}

module.exports = cookieToken;