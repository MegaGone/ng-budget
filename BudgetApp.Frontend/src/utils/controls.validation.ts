import { AbstractControl } from "@angular/forms";

export class ControlsValidations {

    /**
     * 
     * @param control 
     * @returns Null if the control is valid
     */
    static cleanControl(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;
        if (value == null) return;

        const splited = value.split("");

        if (splited[0] === " " || undefined || null) return { space: true }

        if (splited.at(-1) === " " || undefined || null) return { space: true }

        if (value.indexOf("  ") !== -1) return { doubleSpace: true }

        return null;
    }

};