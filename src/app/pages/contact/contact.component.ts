import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseClass } from '../../core/base.class';
import { BannerType } from '../../core/enum';
import { BreakpointService } from '../../core/services/breakpoint.service';
import { LayoutComponent } from '../../layout/layout.component';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})

export class ContactComponent extends BaseClass {
    layout = inject(LayoutComponent, { optional: true });
    bp = inject(BreakpointService);

    banner = computed(() => {
        const sharedData = this.layout?.sharedData();
        if (!sharedData?.banners) return null;

        const foundBanner = sharedData.banners?.find((item: any) =>
            item.page === BannerType.CONTACT && item.isActive
        );
        return foundBanner || null;
    });

    submitted = signal(false);
    success = signal(false);

    form!: FormGroup;

    override ngOnInit(): void {
        window.scrollTo({ top: 0 });
        this.initForm();
    }

    async initForm() {
        this.form = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', Validators.pattern(/^[0-9]{9,11}$/)),
            message: new FormControl('', Validators.required),
            formKey: new FormControl(''),
        });
        // const response = await this.injector.get(ApiService).asyncGet<GenerateFormKeyResponse>('public/customer/form-key')
        // this.form.get('formKey')?.setValue(response.key);
    }

    onSubmit() {
        // this.submitted.set(true);
        // this.form.markAllAsTouched();
        // if (this.form.invalid) {
        //     return;
        // }
        // const input: SubmitConsultationFormInput = {
        //     formKey: this.form.get('formKey')?.value,
        //     fullName: this.form.get('firstName')?.value + ' ' + this.form.get('lastName')?.value,
        //     email: this.form.get('email')?.value,
        //     phone: this.form.get('phone')?.value,
        //     description: this.form.get('message')?.value,
        // };
        // this.injector.get(ApiService).asyncPost<SubmitConsultationFormResponse>('public/customer/submit-form', input)
        //     .then(response => {
        //         if (response.success) {
        //             this.success.set(true);
        //             this.form.reset();
        //             this.submitted.set(false);
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })
    }

    isInvalid(field: string): boolean {
        const ctrl = this.form.get(field);
        return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted());
    }
}
