
//#Settings Interfaces
export interface ICardSettings
{
    posAbsol:string;
    posRel:string;
    marginTop:number;
    marginBot:number;
    marginL:number;
    marginR:number;
    border:string;
    borderRadius:number;
    backColor:string;
    boxShadow:string;
    display:string;
    flexflow:string;
    flex:number;
    cursor:string;
}

export interface IWithActorSettings extends ICardSettings
{
    zIndex:number;
    top:number;
    right:number;
    fontSize:number;
    color:string;
}


export interface ICardImgBodySettings extends ICardSettings
{
    overflow:string;
    height:number;
}
//#endregion


//#Settings Values

export let CardImgBodySettings: ICardImgBodySettings=
{
    overflow: "hidden",
    height: 130,
    posAbsol: "",
    posRel: "relative",
    marginTop: -4,
    marginBot: 0,
    marginL: -0.5,
    marginR: -1,
    border: "",
    borderRadius: 0,
    backColor: "",
    boxShadow: "10px 10px 8px #00000069",
    display: "",
    flexflow: "",
    flex:2.20,
    cursor: ""
}

export let CardSettings: ICardSettings=
{
    posAbsol: "absolute",
    posRel: "relative",
    marginTop: 200,
    marginBot: 250,
    marginL: 10,
    marginR: 10,
    border: "none",
    borderRadius: 4,
    backColor: "#bddcee",
    boxShadow: "5px 5px 5px #f60b0f57",
    display: "flex",
    flexflow: "wrap",
    flex: 100,
    cursor: "pointer"
}

export let WithActorSettings: IWithActorSettings=
{
    posAbsol: "absolute",
    zIndex: 1,
    top: -35,
    right: 850,
    fontSize: 30,
    cursor: "pointer",
    color: "rgba(71, 123, 219, 0.847)",
    posRel: "",
    marginTop: 0,
    marginBot: 0,
    marginL: 0,
    marginR: 0,
    border: "",
    borderRadius: 0,
    backColor: "",
    boxShadow: "",
    display: "",
    flexflow: "",
    flex: 0
}
//#endregion
