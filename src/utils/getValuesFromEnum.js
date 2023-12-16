import LoadTypeEnum from "../enums/LoadTypeEnum"
import WorkFlowConfigurationOptionsEnum from "../enums/WorkFlowConfigurationOptionsEnum";
import WorkFlowLabelsEnum from "../enums/WorkFlowLabelsEnum";

const getValuesFromEnum=(value)=>{
    let returnString='';
    switch(value){
        case LoadTypeEnum.FCL:
            returnString= 'Full container load'
            break;
        case LoadTypeEnum.LCL:
            returnString= "Less than truck load"
            break;
        case WorkFlowLabelsEnum.BUDGET:
            returnString= "Maximum cost"
            break;
        case WorkFlowLabelsEnum.LOAD_TYPE:
            returnString= "Type of Load"
            break;
        case WorkFlowLabelsEnum.CONFIGURATION:
            returnString= "Select Configuration"
            break;
        case WorkFlowConfigurationOptionsEnum.ALLOCATE_TO_LEAST_COST_CARRIER:
            returnString= "Sequentially allocate carriers based on cost"
            break;
        case WorkFlowConfigurationOptionsEnum.ALLOCATE_TO_ALL:
            returnString= "Allocate to all the carriers"
            break;
        default:
            returnString=''
    }
    return returnString;
}
export default getValuesFromEnum;