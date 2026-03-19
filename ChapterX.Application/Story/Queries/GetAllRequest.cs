using MediatR;

namespace ChapterX.Application.Story.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
