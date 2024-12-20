const db = require(`../config/db`)
const bcrypt = require(`bcryptjs`)


//register clients
exports.register = (req, res) => {
    const {client_id, name, surname, phone, email, password, passwordconfirm, role} = req.body;
    console.log(req.body);

    db.query(`select email from clients where email = ?`, [email], async (err, result) =>{
        if(err){
            console.log(err);

        }else if(result.length > 0){
            return res.render(`register`, {
                error: `Email already in use`
            })
        }else if(password !== passwordconfirm){
            return res.render(`register`, {
                error: `Password does not match`
            })
        }else if(!password || password.length < 8){
            return res.render(`register`, {
                error: `Password cannot be empty`
            })
        }else if(!email){
            return res.render(`register`, {
                error: `Email is empty`
            })
        }
        const hashedpassword = await bcrypt.hash(password, 8)
        db.query(`insert into clients set ?`, {name:name, surname:surname, phone:phone, email:email, password:hashedpassword, role:role}, (err, result) => {
            if(err){
                console.log(err);
                
            } else {
                res.render(`register`, {
                    message: `Registered`
                })
                res.redirect(`/login`)
            }
        })
    })
}
 
//register agents
exports.agents = (req, res) => {
    const { name, surname, email, phone, passwordconfirm, password, branch_name, status} = req.body;

    if (!email || !phone || !name){
        return res.render(`registeragent`, {
            error: `Email, Phone Number Field must not be Empty`
        })
    } else {
        db.query(`select email from agents where email = ?`, [email], async(err, result)=>{
            if (err){
                console.log(err);
            } else if (result[0]){
                return res.status(404).render(`registeragent`, {
                    error: `Email Already Exist`
                })
            } else if(password !== passwordconfirm){
                return res.status(404).render(`registeragent`, {
                    error: `Password do not match`
                })
            }
            const hashedpass = await bcrypt.hash(password, 10);
            db.query(`insert into agents set ?`, {name:name, surname:surname, email:email, phone:phone, password:hashedpass, branch_name:branch_name, status:status},
                (err, result) =>{
                    if(err){
                        console.log(err);
                        
                    } else {
                        res.render(`registeragent`, {
                            message: `Agent Registered`
                        })
                    }
                }
            )
        })
    }
}