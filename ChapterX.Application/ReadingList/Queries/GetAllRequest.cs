using MediatR;

namespace ChapterX.Application.ReadingList.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
