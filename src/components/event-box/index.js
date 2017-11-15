import listeners from './listeners';
import sodat from '../../data/SODAT.json';


/**
 * Prints all the wars to the console based on the current year
 */
export const tulostaSodat = () => {

    //console.log("KISSA");

    var year = window.year;
    var sota;
    console.log(year);

    for (let i in sodat) {

        if (sodat[i].start < year && year < sodat[i].stop) {
            sota = sodat[i];
            console.log(sota);
        }
    }
}

const kissa = () => {

    console.log("KISSA");
}

export default () => {
    //tulostaSodat();
    listeners();
    kissa();
}
