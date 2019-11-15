const newUser = new User({
    method: 'local',
    local: {
        email: email,
        password: password
    }
});

await newUser.save();

const token = signToken(newUser);

facebookOAuth: async (req, res, next) => {
    console.log('got here');
}