export function createTableHeadData(dates) {

    let daysConfig = dates.map(date => {
        return {
            desc : date.desc,
            day : date.day,
            date : date.date
        };
    });

    return createArrayOfTheadConfigs(daysConfig, 7);

}

export function createArrayOfTheadConfigs(daysConfig, size) {
    return [].concat.apply([],
        daysConfig.map(function(_,i) {
            return i % size ? [] : [daysConfig.slice(i, i+size)];
        })
    );
}
