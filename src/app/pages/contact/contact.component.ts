import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseClass } from '../../core/base.class';
import { GENERATE_FORM_KEY, SUBMIT_CONSULTATION_FORM } from '../../core/constants/gqlqueries/contact.query';
import { BannerType } from '../../core/enum';
import { ApiService } from '../../core/services/api.service';
import { LayoutComponent } from '../../layout/layout.component';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '../../core/services/breakpoint.service';

interface FormData {
    id?: number;
    value?: string;
    cost?: number;
}

interface ContactForm {
    parentName: string;
    phoneNumber: string;
    childAge: string;
    childNeeds: string;
    submitted: boolean;
}

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
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

    constructor() {
        super();
    }

    questions = [
        {
            id: 1,
            title: 'Bé đang trong độ tuổi nào?',
            values: [
                { label: '3–4 tuổi', value: 'age_3_4', cost: 0 },
                { label: '5–6 tuổi', value: 'age_5_6', cost: 0 },
                { label: '7–8 tuổi', value: 'age_7_8', cost: 0 },
                { label: '9–10 tuổi', value: 'age_9_10', cost: 0 }
            ]
        },
        {
            id: 2,
            title: 'Khi nghe câu tiếng Anh đơn giản, bé hiểu được đến đâu?',
            values: [
                { label: 'Chưa hiểu, phải nói lại bằng tiếng Việt', value: 'not_understand', cost: 0 },
                { label: 'Hiểu được vài từ quen (màu, số, đồ vật…)', value: 'familiar_words', cost: 1 },
                { label: 'Hiểu và làm đúng các câu ngắn (đứng lên, mở sách…)', value: 'short_sentences', cost: 2 },
                { label: 'Hiểu cả câu dài, câu có 2 vế', value: 'long_sentences', cost: 3 }
            ]
        },
        {
            id: 3,
            title: 'Khả năng nói tiếng Anh của bé',
            values: [
                { label: 'Ngại nói hoặc chưa nói được', value: 'cant_speak', cost: 0 },
                { label: 'Nói được 1–2 từ/cụm rất ngắn', value: 'short_phrases', cost: 1 },
                { label: 'Nói được câu mẫu ngắn', value: 'short_sample_sentences', cost: 2 },
                { label: 'Nói được 2–3 câu liên tục để mô tả', value: 'continuous_sentences', cost: 3 }
            ]
        },
        {
            id: 4,
            title: 'Khi giao tiếp bằng tiếng anh, phản xạ của bé như thế nào',
            values: [
                { label: 'Hầu như không phản ứng bằng tiếng Anh', value: 'no_response', cost: 0 },
                { label: 'Trả lời 1 từ (Yes/No, red, two…)', value: 'one_word', cost: 1 },
                { label: 'Trả lời được câu ngắn', value: 'short_answer', cost: 2 },
                { label: 'Chủ động nói thêm, đặt câu hỏi đơn giản', value: 'proactive', cost: 3 }
            ]
        },
        {
            id: 5,
            title: 'Mục tiêu mong muốn của phụ huynh',
            values: [
                { label: 'Làm quen tiếng Anh', value: 'get_familiar', cost: 0 },
                { label: 'Giao tiếp tự tin', value: 'confident_communication', cost: 0 },
                { label: 'Chuẩn hóa phát âm', value: 'standardize_pronunciation', cost: 0 },
                { label: 'Tăng vốn từ vựng', value: 'increase_vocabulary', cost: 0 }
            ]
        }
    ]
    isQuestion = signal(true);
    isResult = signal(false);
    isSupport = signal(false);
    isCompleted = signal(false);
    formData = signal<FormData[]>([]);
    totalCost = computed(() => {
        return this.formData().reduce((total, item) => total + (item.cost || 0), 0);
    });

    // Contact form signal
    contactForm!: FormGroup;
    level = computed(() => {
        const totalCost = this.totalCost();
        if (totalCost <= 2) {
            return {
                name: 'Level 1',
                image: '/images/quick_test/result_level_1.png',
                description: 'Bé chưa hiểu và chưa phản xạ được bằng tiếng Anh. Cần bắt đầu từ việc làm quen âm thanh, từ vựng cơ bản và xây dựng sự tự tin khi nghe – nói.'
            };
        } else if (totalCost <= 4) {
            return {
                name: 'Level 2',
                image: '/images/quick_test/result_level_2.png',
                description: 'Bé hiểu một số từ quen thuộc và có thể trả lời ngắn. Đã có nhận diện tiếng Anh nhưng phản xạ và khả năng nói còn hạn chế, cần luyện tập thường xuyên để hình thành câu hoàn chỉnh.'
            };
        } else if (totalCost <= 6) {
            return {
                name: 'Level 3',
                image: '/images/quick_test/result_level_3.png',
                description: 'Bé hiểu câu ngắn, nói được câu mẫu và có thể giao tiếp cơ bản. Tuy nhiên phản xạ chưa đều, vốn từ và khả năng diễn đạt cần được củng cố thêm.'
            };
        } else if (totalCost <= 9) {
            return {
                name: 'Level 4',
                image: '/images/quick_test/result_level_4.png',
                description: 'Bé hiểu câu dài, giao tiếp chủ động và có thể diễn đạt liên tục 2–3 câu.Có khả năng tương tác tự nhiên, cần môi trường nâng cao để mở rộng vốn từ và phát triển tư duy ngôn ngữ.'
            };
        } else return {
            name: '',
            image: '',
            description: ''
        };
    });

    override ngOnInit(): void {
        this.contactForm = new FormGroup({
            parentName: new FormControl<string>('', Validators.required),
            phoneNumber: new FormControl<string>('', [
                Validators.required,
                Validators.pattern(/^[0-9]{10}$/)
            ]),
            childAge: new FormControl<string>('', [
                Validators.required,
                Validators.pattern(/^[0-9]+$/)
            ]),
            childNeeds: new FormControl<string>('', Validators.required),
            submitted: new FormControl<boolean>(false),
            formKey: new FormControl<string>(''),
        });
    }

    /**
     * Save the survey form
     * - M ≤ 2 ➡ Bé ở Level 1: Bé chưa hình thành nền tảng tiếng Anh
     * - 3 ≤ M ≤4 ➡ Bé ở Level 2: Bé có nhận biết cơ bản
     * - 5 ≤ M ≤6 ➡ Bé ở Level 3: Bé có nền tảng, các kĩ năng chưa ổn định
     * - 7 ≤ M ≤ 9 ➡ Bé ở Level 4: Bé có tảng vững, các kĩ năng tốt
     */
    saveForm() {
        if (this.formData().length < 5) {
            return;
        }
        this.isQuestion.set(false);
        this.isResult.set(true);
        this.scrollToSelector('#resultTitle');
    }

    /**
     * Scroll to element by CSS selector
     */
    scrollToSelector(selector: string) {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100);
    }

    /**
     * Update form data for a question
     */
    updateFormData(id: number, value: string, cost: number) {
        this.formData.update(data => {
            const existingIndex = data.findIndex(item => item.id === id);

            if (existingIndex !== -1) {
                const newData = [...data];
                newData[existingIndex] = { id, value, cost };
                return newData;
            } else {
                return [...data, { id, value, cost }];
            }
        });
    }

    /**
     * Check if a specific answer is selected for a question
     */
    isAnswerSelected(questionId: number, answerValue: string): boolean {
        const answer = this.formData().find(item => item.id === questionId);
        return answer?.value === answerValue;
    }

    /**
     * Submit contact form with validation
     */
    async submitContactForm() {
        this.contactForm.get('submitted')?.setValue(true);
        this.contactForm.markAllAsTouched();

        if (this.contactForm.valid) {
            const input = {
                formKey: this.contactForm.get('formKey')?.value,
                phone: this.contactForm.get('phoneNumber')?.value,
                fullName: this.contactForm.get('parentName')?.value,
                description: `Độ tuổi bé: ${this.contactForm.get('childAge')?.value} tuổi; ` +
                    `Mục tiêu: ${this.contactForm.get('childNeeds')?.value}; ` +
                    `Level của bé: ${this.level().name} (Tổng điểm: ${this.totalCost()});`,
            }
            const response = await this.injector.get(ApiService).executeMutation(SUBMIT_CONSULTATION_FORM, { input });

            // Show completed message and scroll to it
            this.isSupport.set(false);
            this.isCompleted.set(true);
            this.scrollToSelector('#resultTitle');
        }
    }

    async support() {
        this.isQuestion.set(false);
        this.isResult.set(false);
        this.isSupport.set(true);
        this.scrollToSelector('#supportTitle');
        const response = await this.injector.get(ApiService).executeQuery(GENERATE_FORM_KEY);
        if (response) {
            this.contactForm.get('formKey')?.setValue(response.generateFormKey?.key);
        }
    }
}
