<?php

namespace App\Validation;

interface ValidatorInterface {
    /**
     * @param array $data
     * @return array{isValid: bool, errors: string[]}
     */
    public function validate(array $data): array;
}
