export const baseurl="https://moneymanager-qr5f.onrender.com/api/v1.0";
// export const baseurl="http://localhost:8081/api/v1.0";
const CLOUD_USERNAME= "dlpmgmznv";

export const ApiEndpoints={
     REGISTER:`${baseurl}/register`,
     LOGIN:`${baseurl}/login`,
     UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUD_USERNAME}/image/upload`,
     GET_ALL_EXPENSE:`${baseurl}/expenses/`,
     GET_ALL_INCOME:`${baseurl}/incomes/`,
     ADD_EXPENSE:`${baseurl}/expenses/`,
     ADD_INCOME:`${baseurl}/incomes/`,
     DELETE_EXPENSE:(expenseId)=>`${baseurl}/expenses/${expenseId}`,
     DELETE_INCOME:(incomeId)=>`${baseurl}/incomes/${incomeId}`,
     UPDATE_EXPENSE:(expenseId)=>`${baseurl}/expenses/${expenseId}`,
     UPDATE_INCOME:(incomeId)=>`${baseurl}/incomes/${incomeId}`,
     CATEGORY_BY_TYPE:(type)=>`${baseurl}/categories/${type}`,
     GET_ALL_CATEGORY:`${baseurl}/categories/ `,
     ADD_CATEGORY:`${baseurl}/categories/`,
     DELETE_CATEGORY:(categoryId)=>`${baseurl}/categories/${categoryId}`,
     UPDATE_CATEGORY:(categoryId)=>`${baseurl}/categories/${categoryId}`,
     DASHBORD_DETAILS:`${baseurl}/dashboard/`,

     FILTER_DATA:`${baseurl}/filter/`,

     SEND_EMAIL_ATTATCHMENT_INCOME:`${baseurl}/email/income/excel`,
     DOWNLOAD_INCOME_EXCEL:`${baseurl}/excel/download/income`,
     DOWNLOAD_EXPENSE_EXCEL:`${baseurl}/excel/download/expense`,
     SEND_EMAIL_ATTATCHMENT_ExPENSE:`${baseurl}/email/expense/excel`,
     GET_USER_INFO:`${baseurl}/profile`,
     
    
}