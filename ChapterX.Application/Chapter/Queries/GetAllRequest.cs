using MediatR;

namespace ChapterX.Application.Chapter.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
