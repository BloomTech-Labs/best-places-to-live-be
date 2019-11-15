const newUser = new User({
    method: 'local',
    local: {
        email: email,
        password: password
    }
});

await newUser.save();



facebookOAuth: async (req, res, next) => {
    console.log('got here');
    console.log('req.user', req.user)
    const token = signToken(newUser);
    res.status(200).JSON(token)
}