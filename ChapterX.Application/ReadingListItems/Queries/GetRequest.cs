using MediatR;

namespace ChapterX.Application.ReadingListItems.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
