export function createTableHeadData(dates) {

    let daysConfig = dates.map(date => {
        return {
            desc : date.desc,
            day : date.day,
            date : date.date
        };
    });

    return createArrayOfTheadConfigs(daysConfig, 7).map(week => {
        week.unshift({
            desc : null,
            day : null,
            date : null
        });
        return week;
    });

}

export function createArrayOfTheadConfigs(daysConfig, size) {
    return [].concat.apply([],
        daysConfig.map(function(_,i) {
            return i % size ? [] : [daysConfig.slice(i, i+size)];
        })
    );
}
