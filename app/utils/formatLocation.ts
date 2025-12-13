export function formatLocation(
    streetAddress: string,
    city: string,
    stateCode: statecode,
    postCode: number
): string {
    return `${streetAddress ?? ''}${streetAddress ? ',' : ''} ${city ?? ''} ${stateCode ?? ''} ${postCode ?? ''}`
}