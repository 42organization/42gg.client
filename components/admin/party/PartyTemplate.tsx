import React, { useEffect, useState } from 'react';
import { PartyGameTemplete } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import TemplateModal from './TemplateModal';

export default function PartyTemplate({ categoryId }: { categoryId: number }) {
  const [templates, setTemplates] = useState<PartyGameTemplete[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );

  const handleAddOrEditTemplate = (templateId: number | null = null) => {
    setSelectedTemplateId(templateId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplateId(null);
  };

  useEffect(() => {
    mockInstance
      .get(`/party/categorys/${categoryId}/templates`)
      .then(({ data }: { data: PartyGameTemplete[] }) => {
        setTemplates(data);
      })
      .catch((error) => {
        console.error('템플릿 정보를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, [categoryId]);

  const deleteTemplate = (templateId: number) => {
    mockInstance
      .delete(`/party/admin/templates/${templateId}`)
      .then((response) => {
        setTemplates(
          templates.filter((template) => template.gameTemplateId !== templateId)
        );
      })
      .catch((error) => {
        console.error('템플릿 삭제 중 오류가 발생했습니다:', error);
      });
  };
  return (
    <div>
      <h2>템플릿 목록</h2>
      <button onClick={() => handleAddOrEditTemplate()}>추가</button>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>게임 이름</th>
            <th>최대 참여 인원</th>
            <th>최소 참여 인원</th>
            <th>최대 게임 시간</th>
            <th>최소 게임 시간</th>
            <th>장르</th>
            <th>난이도</th>
            <th>요약</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.gameTemplateId}>
              <td>{template.gameTemplateId}</td>
              <td>{template.gameName}</td>
              <td>{template.maxGamePeople}</td>
              <td>{template.minGamePeople}</td>
              <td>{template.maxGameTime}</td>
              <td>{template.minGameTime}</td>
              <td>{template.genre}</td>
              <td>{template.difficulty}</td>
              <td>{template.summary}</td>
              <button
                onClick={() => handleAddOrEditTemplate(template.gameTemplateId)}
              >
                변경
              </button>
              <td>
                <button onClick={() => deleteTemplate(template.gameTemplateId)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TemplateModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        categoryId={categoryId}
        template={
          selectedTemplateId !== null
            ? templates.find(
                (template) => template.gameTemplateId === selectedTemplateId
              )
            : undefined
        }
      />
    </div>
  );
}
