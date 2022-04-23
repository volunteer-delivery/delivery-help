function preparePublicSchema(schema) {
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    schema.set('toJSON', {
        virtuals: true,

        transform: (doc, converted) => {
            delete converted._id;
            delete converted.__v;
            delete converted._telegramId;
        }
    });
}

function prepareInternalSchema(schema) {
    schema.set('toJSON', {
        transform: (doc, converted) => {
            delete converted._id;
            delete converted.__v;
        }
    });
}

module.exports = { prepareInternalSchema, preparePublicSchema };
