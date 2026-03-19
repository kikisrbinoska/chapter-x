using MediatR;

namespace ChapterX.Application.ReadingListItems.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
