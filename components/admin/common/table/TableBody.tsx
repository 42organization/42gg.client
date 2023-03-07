import { tableFormat } from 'constants/admin/table';
import { TableName } from 'types/admin/tableTypes';
import { IFeedback, IUser } from 'types/admin/tableTypes';

export default function TableBody({
  format,
  rawDataList,
}: {
  format: TableName;
  rawDataList: (IFeedback | IUser)[];
}) {
  // TODO: format에 따른 etcAction 반환해주는 custom hook

  if (!rawDataList.length)
    return (
      <tbody>
        <tr>
          <td>loading...</td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {rawDataList.map((rawData: IFeedback | IUser, index: number) => {
        return (
          <tr key={index}>
            {tableFormat[format].columns.map(
              (column: string, index2: number) => {
                if (column === 'etc') {
                  // userInfo
                  return (
                    <td key={index2}>
                      {tableFormat[format].etc?.value.map(
                        (buttonName: string) => (
                          <button
                            key={buttonName}
                            style={{
                              border: 'none',
                              borderRadius: '10px',
                              padding: '4px 12px',
                              marginLeft: '10px',
                              cursor: 'pointer',
                              backgroundColor:
                                buttonName === '자세히' ? '#e5e7eb' : '#2678f3',
                              color:
                                buttonName === '자세히' ? '#6b7280' : 'white',
                            }}
                          >
                            {buttonName}
                          </button>
                        )
                      )}
                    </td>
                  );
                } else if (column === 'isSolved') {
                  // feedback
                  return (
                    <td key={index2}>
                      <select
                        value={
                          rawData[column as keyof (IFeedback | IUser)] ? 1 : 0
                        }
                        onChange={() => console.log('toggle')}
                      >
                        <option value='0'>처리중</option>
                        <option value='1'>처리완료</option>
                      </select>
                    </td>
                  );
                } else {
                  return (
                    <td key={index2}>
                      {rawData[column as keyof (IFeedback | IUser)]?.toString()}
                    </td>
                  );
                }
              }
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
