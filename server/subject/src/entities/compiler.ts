export interface Compiler{
    question_title: void;
    question_description:string;
    input_format:string;
    output_format:string;
    sample_input:string;
    sample_output:string;
    difficulty_level: 'easy' | 'medium' | 'hard';
    tags:[];
}