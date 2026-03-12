<?php
namespace App\Validation;

use JsonSchema\Validator;

class InquirySchemaValidator implements ValidatorInterface {
    public function validate(array $data): array {
        $validator = new Validator();
        
        // 1. 配列をオブジェクトに変換（ライブラリの仕様上必要）
        $dataObject = json_decode(json_encode($data));
        
        // 2. 共通スキーマファイルを読み込む
        $schemaPath = __DIR__ . '/../../../shared/schemas/inquiry.schema.json';
        $schema = json_decode(file_get_contents($schemaPath));

        // 3. 検証実行
        $validator->validate($dataObject, $schema);

        if (!$validator->isValid()) {
            return [
                'isValid' => false,
                'errors' => array_map(fn($e) => $e['message'], $validator->getErrors())
            ];
        }

        return ['isValid' => true, 'errors' => []];
    }
}
