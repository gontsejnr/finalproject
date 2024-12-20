const db = require(`../config/db`)
const jwt = require(`jsonwebtoken`)
const bcrypt = require(`bcryptjs`)

exports.login = (req, res) => {
   // console.log(req.body);
    const { email, password } = req.body

    if (!email || !password) {
        return res.render(`login`, {
            error: `Please input Email/Password`
        })
    } else {
        db.query(`select * from clients where email = ?`, [email], async (err, result) =>{
            if (err) {
                console.log(err);
                
            }else if(!result[0] || !await bcrypt.compare(password, result[0].password)){
                return res.render(`login`, {
                    error: `Invalid email or password`
                })
            }
            const token = jwt.sign({role:`client`, client_id: result[0].client_id, name: result[0].name, email: result[0].email}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            })

            const cookieoptions = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: `Lax`
            }

            res.cookie(`clientRegister`, token, cookieoptions)
            res.redirect(`/dashboard`)
        })
    }
}