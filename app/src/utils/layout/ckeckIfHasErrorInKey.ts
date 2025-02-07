function ckeckIfHasErrorInKey(errors: Partial<Record<string, string | undefined>>, key: string, inputType?: string) {
    if (key in errors) {
        if (inputType === 'select') {
            return {'select-error': true}
        }

        return {'input-error': true}
    }

    return {}
}

export default ckeckIfHasErrorInKey
