module.exports = function solveSudoku(matrix) {
    function isRow(matrix,i,num){
        for(let j = 0;j<matrix.length;++j){
            if(matrix[i][j]===num)return false;
        }
        return true;
    }
    function isColumn(matrix,j,num){
        for(let i = 0;i<matrix.length;++i){
            if(matrix[i][j]===num)return false;
        }
        return true;
    }
    function isBlock(matrix,i,j,num){
        let row = 3*(Math.floor(i/3));
        let column = 3*(Math.floor(j/3));
        for(let r = 0;r<3;++r){
            for(let c = 0;c<3;++c){
                if(matrix[r+row][c+column]===num)return false;
            }
        }
        return true;
    }
    /**Метод одиночки,чтобы упростить решение*/
    function setSingletones(matrix){
        var arr = [];
        for(let i = 0;i<matrix.length;++i){
            for(let j = 0;j<matrix.length;++j){
                if(!matrix[i][j])arr.push([i,j,[]]);

            }
        }

        for(let a of arr){
            for(let i = 1;i<=9;++i){
                if(isRow(matrix,a[0],i) && isColumn(matrix,a[1],i) && isBlock(matrix,a[0],a[1],i))
                    a[2].push(i);
            }
        }
        let count = 0;
        for(let a of arr){
            if(a[2].length>1)count++;
        }
        if(arr.length===count)return matrix;
        for(let a of arr){
            if(a.length===0 && res[a[0]][a[1]]===0)return matrix;
            if(a[2].length===1){
                matrix[a[0]][a[1]]=a[2][0];
            }
        }
        return setSingletones(matrix);
    }
    /**Само рекурсивное решение*/
    function setSolution(matrix){
        let success=true,failure=false;
        var arr = [];
        for(let i = 0;i<matrix.length;++i){
            for(let j = 0;j<matrix.length;++j){
                if(!matrix[i][j])arr.push([i,j,[]]);

            }
        }
        if(arr.length===0)return success;
        for(let a of arr){
            for(let i = 1;i<=9;++i){
                if(isRow(matrix,a[0],i) && isColumn(matrix,a[1],i) && isBlock(matrix,a[0],a[1],i))
                    a[2].push(i);
            }
        }
        let min = arr[0];
        for(let i = 1;i<arr.length;++i){
            if(arr[i][2].length<min[2].length)min = arr[i];
        }
        for(let a of min[2]){
            matrix[min[0]][min[1]]=a;
            let status = setSolution(matrix);
            if(status===success)return success;
            else matrix[min[0]][min[1]] = 0;
        }

        return failure;
    }
    var res = setSingletones(matrix);
    setSolution(res);
    return matrix;
}
