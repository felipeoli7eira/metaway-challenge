function ckeckIfHasErrorInKey(errors: Partial<Record<string, string | undefined>>, key: string) {
    if (key in errors) {
        return {'input-error': true}
    }

    return {}
}

export default ckeckIfHasErrorInKey
