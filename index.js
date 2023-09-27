const AWS = require("aws-sdk");
const ses = new AWS.SES();

module.exports.create = async (event) => {
    const {to,from,subject,message} = JSON.parse(event.body);
    if(!to || !from || !subject || !message){
      console.log("Some error in to from subject or message...");
      return {
        statusCode: 400,
        body: "Error"
      }
    }
    
    const params = {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Text: {Data: message}
        },
        Subject: {Data: subject},
      },
      Source: from
    };
    console.log("params",params)
    try {
      console.log("response in")
      const response  = await ses.sendEmail(params).promise();
      console.log("response",response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    } catch (error) {
      console.log("response in",error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    }
};
