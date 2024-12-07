export function getParams(start_date, end_date, age, gender, category) {
    const params = {};

    if (start_date && start_date !== "") {
        params.start_date = start_date;

    }

    if (end_date && end_date !== "") {
        params.end_date = end_date;
    }

    if (age && age !== "any") {
        params.age = age;
    }

    if (gender && gender !== "any") {
        params.gender = gender;
    }

    if(category && category !== ""){
        params.category = category;
    }

    return params;
}

export function groupDataByDay(data, selected) {
    const grouped = data.reduce((acc, item) => {
        const day = item.Day.split("T")[0];
        acc[day] = (acc[day] || 0) + item[selected];
        return acc;
    }, {});
    return {
        labels: Object.keys(grouped),
        data: Object.values(grouped),
    };
};

export function setParams(param, navigate){
    const queryParams = new URLSearchParams(param);
    navigate(`?${queryParams.toString()}`);
}