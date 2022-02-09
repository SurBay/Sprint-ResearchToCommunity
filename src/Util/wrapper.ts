export async function tryCatchWrapper<ParamType, ReturnType>(
    func: (param?: ParamType) => ReturnType,
    param?: ParamType
) {
    try {
        return await func(param);
    } catch (error) {
        console.log(`ERROR in ${func.name}: ${error}`);
        throw error;
    }
}
