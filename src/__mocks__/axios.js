const mockResponse = {
    data: {
      results: [
        {
          name: {
            first: "Laith",
            last: "Harb",
          },
          picture: {
            large: "https://randomuser.me/api/portraits/men/59.jpg",
          },
          login: {
            username: "ThePhonyGOAT",
          },
        },
        {
          name: {
            first: "Wesley",
            last: "Bruno",
          },
          picture: {
            large: "https://randomuser.me/api/portraits/men/59.jpg",
          },
          login: {
            username: "ThePhonyGOAT",
          },
        },
      ],
    },
  };
  
  const mockAxios = {
    get: jest.fn().mockResolvedValue(mockResponse),
    create: jest.fn(),
  };
  
export default mockAxios;