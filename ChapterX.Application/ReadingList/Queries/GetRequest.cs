using MediatR;

namespace ChapterX.Application.ReadingList.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
