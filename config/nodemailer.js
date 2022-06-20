const nodemailer=require('nodemailer')

let tranporter=nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'souravpahuja10@gmail.com',
        pass: 'cricketer'
    }
})

let renderTemplate = (data,relativePath)=>{
    let mailHTML
    ejs.renderFile(
        path.join(  )
    )
}       //relative path is from where the mail is being sent
