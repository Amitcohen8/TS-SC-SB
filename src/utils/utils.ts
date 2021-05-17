export const genInitialState = (size:'100' | '200' | '300') => {
    const boardArr:boardArrOfObj = []

    for(let id=1;id<10;id++){
        boardArr.push({id,shape:'empty',size})
    }

    return {boardArr,turn:true,winner:""}
}

export interface boardObj {
    id:number;
    shape:'empty' | 'x' | 'o';
    size:'100' | '200' | '300';
}

export interface boardArrOfObj extends Array<boardObj>{
    
}


export const winnerCheck = [ '123',
'456',
'789',
'147',
'258',
'369',
'357',
'159']
   
