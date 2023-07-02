import { Schema, model } from "mongoose";
import { ITemplateModel } from "src/database";
import { generateGUID } from "src/helpers";

const TemplateSchema: Schema = new Schema({
    identificator: {
        type: String,
        unique: true,
        default: generateGUID()
    },
    from: {
        type: String,
        required: [true, "Sender required"],
        match: /^\S+@\S+\.\S+$/,
    },
    subject: {
        type: String,
        required: [true, "Subject required"],
        unique: true
    },
    template: {
        type: String,
        required: [true, "Subject required"]
    },
    fields: {
        type: [String],
        required: [true, "Fields required"]
    }
});

TemplateSchema.pre("save", function(next) {
    if (this.from && !this.from.includes("<megagone.dev@gmail.com>")) {
        this.from += " <megagone.dev@gmail.com>";
    };
    
    next();
});

TemplateSchema.methods.toJSON = function() {
    const { __v, _id, ...template } = this.toObject();
    return template;
};

export const TemplateModel = model<ITemplateModel>("Template", TemplateSchema);